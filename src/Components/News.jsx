import React, { Component } from 'react';
import NewsItems from './NewsItems.jsx';
import { Spinner } from './Spinner.jsx';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country : "in",
        category: 'general',
        pageSize: 9
    }

    static propTypes = {
        country : PropTypes.string,
        category:PropTypes.string,
        pageSize: PropTypes.number
    } 

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults : 0
        }
        document.title = `${this.props.category} - NewsMonkey`;
    }

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize} `;
        this.setState({loading: true})
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }
    handleNextClick = async () => {
        // console.log("Next");
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){}

        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a718d187e95e4f00983ae986d65c9178&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true})
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
            
        //     console.log(parsedData);

        //     this.setState({
        //         loading: false,
        //         page: this.state.page + 1,
        //         articles: parsedData.articles
        //     })
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }

    handlePreviousClick = async () => {
        // console.log("Previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a718d187e95e4f00983ae986d65c9178&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true})
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }

    async componentDidMount(){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a718d187e95e4f00983ae986d65c9178&pageSize=${this.props.pageSize} `;
    //   this.setState({loading: true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading: false
    // });
    this.updateNews();
    }

    fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize} `;
        // this.setState({loading: true})
        this.setState({page: this.state.page + 1});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
    }


    render() {
        return (
            <>
            {/* <div className="container my-3"> */}
                <h1 className="text-center" style={{marginTop: '90px'}}>NewsBird - Top {this.props.category} Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    // dataLength={this.state.articles ? this.state.articles.length : 0}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row my-3 mx-2">
                            {this.state.articles.map((element)=>{
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItems title={element.title?element.title.slice(0, 45):""} description={element.description?element.title.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                </div> 
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}> &lArr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rArr; </button>
                </div>     */}
                
               
            {/* </div> */}
            </>
        )
    }
}

export default News