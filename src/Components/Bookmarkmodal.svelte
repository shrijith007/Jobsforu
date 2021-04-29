<script>

import {createEventDispatcher} from "svelte";
import {db} from "../firebase";
import { collectionData } from 'rxfire/firestore';
import {job} from "./Store";

export let bookmarklist;
export let uid;
const dispatch=createEventDispatcher();




async function removeItem(id,uid) {
      await db.collection("Bookmarks"+uid).doc(id).delete();
       job.removebookmark(id);
         }

    
</script>



<style>
  
  article {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
          border-radius: 5px;
          background: white;
          margin: 1rem;
        }
      
        footer {
          padding: 1rem;
          text-align: center;
        }
      
      
        h1 {
          font-size: 1.25rem;
          margin: 0.5rem 0;
          font-family: "Roboto Slab", sans-serif;
          padding-top: 2%;
          padding-left: 2%;
          color: cornflowerblue;
          text-align: center;
        }
      
        h2 {
          text-align: justify;
          font-size: 1rem;
          color:crimson;
          margin: 0.5rem 0;
          padding-left: 50%;
        }
        
        p {
          font-size: 1rem;
          margin: 0;
          text-align: center;
        }
    
      
        div {
          text-align: right;
        }

        input[type="submit"] {
      
      width:240px;
      height:35px;
      display:block;
      font-family:Arial, "Helvetica", sans-serif;
      font-size:16px;
      font-weight:bold;
      color:#fff;
      text-decoration:none;
      text-transform:uppercase;
      text-align:center;
      text-shadow:1px 1px 0px #37a69b;
      margin: 29px 0 0 29px;
      position:relative;
      cursor:pointer;
      border: none;  
      background-color: #37a69b;
      background-image: linear-gradient(top,#3db0a6,#3111);
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius:5px;
      box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #497a78, 0px 10px 5px #999;
    }
    
    input[type="submit"]:active {
      top:3px;
      box-shadow: inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #31524d, 0px 5px 3px #999;
    }
  .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        z-index: 10;
      }
      
      .modal {
        position: fixed;
        top: 10vh;
        left: 10%;
        width: 180%;
        max-height: 80vh;
        background: white;
        border-radius: 5px;
        z-index: 100;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        overflow: scroll;
      }
      
      h6 {
        font-size:xx-large;
        padding: 1rem;
        margin: 0;
        border-bottom: 1px solid #ccc;
        font-family: 'Roboto Slab', sans-serif;
      }
      
      .content {
        padding: 1rem;
      }
      
      footer {
        padding: 1rem;
      }
      
      @media (min-width: 768px) {
        .modal {
          width: 80rem;
          height: 80rem;
        }
      }
      header{
        border-bottom:1px solid;
      }

</style>

<div class="backdrop"/>
<div class="modal">
<header>
  <slot name="close">
<input type="submit"  on:click={()=>dispatch("close")}  value="Close" >
</slot>
<h6>Bookmarks</h6>  
</header>
<div class="content">
  {#each bookmarklist as bookmark,id}
  <section>
    <article>
        
      <h1>{id} </h1>
          <h1>{bookmark.Title} </h1>
          <h2>{bookmark.Source}</h2>
        <div class="content">
          <p>{@html  bookmark.Description}</p>
        </div>
        <footer>
            <a href={bookmark.Link}>
            <input type="submit"   value="See more" > 
          </a>
          <input type="submit"  on:click={removeItem(bookmark.id,uid)}   value="Remove" >
            </footer>
            </article>

</section>
{/each}
</div>
</div>