import React, {Component} from "react"
import Api from "../../services/api"
import {Link} from "react-router-dom"
import "./style.css"

export default class Product extends Component{
    
    constructor(){
        super()

        this.state = {
            product: {},
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
        const object = {}

        if(this.state.title != ""){
            object.title = this.state.title
        }
        if(this.state.description != ""){
            object.description = this.state.description
        }
        if(this.state.url != ""){
            object.url = this.state.url
        }

        this.update(object)
        // event.preventDefault();
    }
    
    async componentDidMount(){
        const {id} = this.props.match.params
        const response = await Api.get(`/products/${id}`)
        this.setState({product: response.data})
    }

    update = async(object) => {
        const {id} = this.props.match.params

        try {
            await Api.put(`/products/${id}`, object)
            alert("Registro alterado com sucesso!")  
        } catch (err) {
            alert("Erro na requisição!")
        }
    }

    delete = async() => {
        const {id} = this.props.match.params

        try {
            await Api.delete(`/products/${id}`)
        } catch (err) {
            alert("Erro na requisição!")
        }
    }

    render(){
        const {product} = this.state
        return ( 
            <div className="product-info">
                <article>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <div className="url">
                        <a target="_blank" href={product.url}>
                            Ir para: {product.url}
                        </a>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Titulo" value={this.state.value} onChange={this.titleChange} />
                        <input type="text" placeholder="Descrição" value={this.state.value} onChange={this.descriptionChange} />
                        <input type="text" placeholder="Url" value={this.state.value} onChange={this.urlChange} />
                        <input type="submit" value="Alterar Informações" />
                    </form>
                    <div className="apagar-dado">
                        <Link onClick={this.delete} to={"/"}>Apagar Registro</Link>
                    </div>
                    <Link to={"/"}>Voltar</Link>
                </article>
            </div>
        )
    }
}