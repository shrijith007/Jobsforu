<script>
    import { insert } from "svelte/internal";
    
    
      
    export let job;
    
    export let userObject;
    export let userbase;
    
    let bookmarks=[]
    
    function addbookmark(bookmark){
      if (userObject) userbase.openDatabase({
      databaseName: 'Bookmarks',
      changeHandler: function (items) {
      bookmarks = items
      }
    }).then(() => {
      userbase.insertItem({
      databaseName: 'Bookmarks',
      item: [{
             Title: bookmark.Title,
              Source:bookmark.Source,
              Description:bookmark.Description,
              Link:bookmark.Link
    }]
    })
    })
    console.log(bookmarks)
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
            }
          
            h2 {
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
        align-items: center;
      
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
          </style>
        
    <section>
            <article>
                
                  <h1>{job.Title} </h1>
                  <h2>{job.Source}</h2>
                <div class="content">
                  <p>{@html  job.Description}</p>
                </div>
                <footer>
                    <a href={job.Link}>
                    <input type="submit"   value="See more" > 
                  </a>
                    </footer>
                    </article>
    
    </section>
          

        