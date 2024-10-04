import React, { Component } from 'react'

export class NewsItems extends Component {
    render(){
        let {title, description, imageUrl, newsUrl, author, date} = this.props;

        return (    
            <div>
                <div className="card my-4">
                    <img src={!imageUrl?"https://theaviationist.com/wp-content/uploads/2024/06/F-22-500K-FH-top-new-678x381.jpg":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsUrl} className="btn btn-dark">Read More...</a>
                    </div>
            </div>
            </div>
        )
    }
}

export default NewsItems