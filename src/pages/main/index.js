import React, { Component} from "react"
import api from "../../services/api"
import "./style.css"
import {Link} from "react-router-dom"

export default class Main extends Component{
    
    constructor(){
        super()

        this.state = {
            products: [],
            productInfo: {},
            page: 1,
            title: "",
            description: "",
            url: "",
        }

        this.titleChange = this.titleChange.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
        this.urlChange = this.urlChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

     titleChange(event) {
        this.setState({
            title: event.target.value,
        });
      }

    descriptionChange(event) {
        this.setState({
            description: event.target.value,
        });
    }
    
    urlChange(event) {
        this.setState({
            url: event.target.value,
        });
    }
    
    handleSubmit(event) {
        const object = {
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
        }
        const {title, description, url} = object
        
        if(title === "" || description === "" || url === ""){
            alert("Preencha todos os campos para fazer a adição!")
        }else{
            this.create(object)
            alert("Registro criado com sucesso!")
        }
        // event.preventDefault();
    }

    componentDidMount(){
        this.loadProducts()
    }

    loadProducts = async(page = 1) => {
        const response = await api.get(`/products?page=${page}`)
        const {docs, ...productInfo} = response.data
        this.setState({
            products: docs, productInfo, page
        })
    }

    create = async(object) => {
        try {
            await api.post("/products", object)
            console.log("Dados Inseridos!")
            // alert("Registro criado com sucesso!")
        } catch (error) {
            console.log("Dados não Inseridos!")
            // alert("Erro na requisição!")
        }
        
    }

    prevPage = () => {
        const {page} = this.state

        if(page === 1) 
            return
        
        const pageNumber = page - 1
        this.loadProducts(pageNumber)
    }

    nextPage = () => {
        const {page, productInfo} = this.state

        if(page === productInfo.pages) 
            return
        
        const pageNumber = page + 1
        this.loadProducts(pageNumber)
    }

    render(){
        const { products, page, productInfo } = this.state

        return (
            <div className="product-list">
                <div className="add-ferramenta">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Titulo" value={this.state.value} onChange={this.titleChange} />
                        <input type="text" placeholder="Descrição" value={this.state.value} onChange={this.descriptionChange} />
                        <input type="text" placeholder="Url" value={this.state.value} onChange={this.urlChange} />
                        <input type="submit" value="Adicionar Nova Ferramenta" />
                    </form>
                    {/* <Link type="submit">Adicionar Nova Ferramenta</Link> */}
                </div>
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Ver Detalhes</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Proximo</button>        
                </div>
            </div>
        )
    }
}