import { Component } from "react";
import "./styles.css";
import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import {Button} from "../../components/Button"
import { TextInput } from "../../components/TextInput";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state
    
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, (nextPage+postsPerPage))
    posts.push(...nextPosts)

    this.setState({posts, page: nextPage})
  }

  handleChange = () => {
    const {value} = e.target
    this.setState({...this.state, searchValue: value})
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
    //Com valor, filtra todos os posts que tem o título igual ao q foi digitado no searchValue 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
        )
    })
    //Sem valor, retorna posts normal
    : posts

    return (
      <section className="container">
        <div className="search-container">
          {/*Se isso for true, faça isso:*/}
          {!!searchValue && (
              <h1>Search Value: {searchValue}</h1>
          )}
          <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>

         {filteredPosts.length > 0 && (
           <Posts posts={filteredPosts} />
         )} 

         {filteredPosts.length === 0 && (
           <p>Não existem posts com este título :(</p>
         )} 

        <div className="button-container">
          {!searchValue && (
            <Button 
            text="load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
          )}
        </div>
      </section>
    );
  }
}
