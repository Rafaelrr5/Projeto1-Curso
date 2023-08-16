import { useState, useEffect, useCallback } from "react";
import "./styles.css";
import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import {Button} from "../../components/Button"
import { TextInput } from "../../components/TextInput";

export const Home = () => {

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')

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

   const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }, []);

  const loadMorePosts = () => {
    
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, (nextPage+postsPerPage))
    posts.push(...nextPosts)

    setPosts(posts)
    setPage(nextPage)
  }

  const handleChange = () => {
    const {value} = e.target
    setSearchValue(value)
  }

  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
  }, [handleLoadPosts, postsPerPage])
  
  return (
    <section className="container">
      <div className="search-container">
        {/*Se isso for true, faça isso:*/}
        {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange}/>
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
          onClick={loadMorePosts}
          disabled={noMorePosts}
        />
        )}
      </div>
    </section>
  );
}