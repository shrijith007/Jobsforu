<script>
import Header from "./Components/Header.svelte";
import {job }from "./Components/Store";
import {bookmarklist, jobs} from "./Components/Store";
import Joblist from "./Components/Joblist.svelte";
import { auth, googleProvider,db } from './firebase';
  import { authState } from 'rxfire/auth';
import Homejoblist from "./Components/Homejoblist.svelte";
import { collectionData } from "rxfire/firestore";
import { startWith } from "rxjs/operators";
import { query_selector_all } from "svelte/internal";
import Bookmarkmodal from "./Components/Bookmarkmodal.svelte"



let bookmarkdone= false;
let q="";
let l="";
let rbc="";
let url ="";
let joblists=[];
let bookmarklists=[];

let user;

const unsubscribe = authState(auth).subscribe(u => user = u);  


async function signIn() {
     auth.signInWithPopup(googleProvider);
     
            }

    async function signOut() {
      auth.signOut()
    }

async function  showbookmark(){
  let bookmark=[]
  db.collection("Bookmarks"+user.uid).onSnapshot(querySnapshot=>{
    querySnapshot.forEach(doc=>{
       bookmark=[...bookmark,
       {
         id:doc.id,
         Title:doc.data().Title,
         Source:doc.data().Source,
         Description:doc.data().Description,
         Link:doc.data().Link
        }] 
    })    
job.setbookmarks(bookmark)
  })
}
  
jobs.subscribe(joblist=>{
joblists=[];	
for (const key in joblist){
joblists.push({
	id:key,
	Title:joblist[key].Title,
	Source:joblist[key].source,
	Link:joblist[key].link,
	Description:joblist[key].description	
})
}
})


bookmarklist.subscribe(bookmarks=>{
bookmarklists=[];	
for (const key in bookmarks){
  bookmarklists.push({

	id:bookmarks[key].id,
	Title:bookmarks[key].Title,
	Source:bookmarks[key].Source,
	Link:bookmarks[key].Link,
	Description:bookmarks[key].Description	
})
}
})


async function fetchdata(q,l,rbc){
	url='https://backendjobsss.herokuapp.com/job?q='+q +'&l='+l+'&rbc='+rbc;
	const response= await fetch(url);	
	const datas=await response.json();
	let results=[];
	for (const key in datas){
		results.push(datas[key])
	
}
job.setjobs(results);
}



</script>



<Header/>




{#if  !user}

<input type="submit"  on:click={signIn}  value="Sign In">

<div class="form" >
  <p> <input  placeholder="Job" on:input={()=>{ done=true }}  type='text' bind:value={q}></p>
  <p> <input  placeholder="Location" type='text' bind:value={l} ></p>
  <p> <input placeholder="Company" type='text' bind:value={rbc} ></p>
  <p class="submit">
    <input  type="submit" on:click="{fetchdata(q,l,rbc)}" value="Search" > 	
    <p>
  </div>
<section>
{#each  joblists as job}
<div>
  <Homejoblist job={job} />
</div>
{/each} 

</section>
    {:else}
<div class="sub">
  
  {console.log(user)}
    <h5>Hi {user.displayName} </h5>
    <input type="submit" on:click={signOut} value="Sign Out"> 
    <input type="submit" on:click={()=>{ bookmarkdone=true }} on:click={showbookmark} value="Bookmark"> 

</div>        
<div class="form" >
			<p> <input  placeholder="Job" on:input={()=>{ done=true }}  type='text' bind:value={q}></p>
			<p> <input  placeholder="Location" type='text' bind:value={l} ></p>
			<p> <input placeholder="Company" type='text' bind:value={rbc} ></p>
			<p class="submit">
				<input  type="submit" on:click="{fetchdata(q,l,rbc)}" value="Search" > 	
				<p>
			</div>




	<section>
		{#each  joblists as job}
		<div>
			<Joblist job={job} uid={user.uid} />
		</div>
	{/each} 
  
    </section>



    {#if bookmarkdone==true}
	<section>
    <Bookmarkmodal on:close={()=>bookmarkdone=false} bookmarklist={bookmarklists}  uid={user.uid}/>
    </section>
    {/if}
        {/if}

<style>
  .form{
    padding-top: 2rem;

  }

    h5{
        font-size: larger;
        padding-top: 3rem;
        float: inline-start;
    }
    
    section {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 0.5rem;
          }
          
          @media (min-width: 768px) {
            section {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        
        
        p{
            padding-left: 5%;
            display: inline-flex;
        }
        
        .submit{
            align-self: center;
        }
        
    .loginform{
        padding:10rem ;
           position: relative;
       } 
    .login {
      background: #eceeee;
      border: 3px solid #42464b;
      border-radius: 6px;
      height: 300px;
      margin: 20px auto 0;
      width: 298px;
    }
    input[type="password"], input[type="text"] {
      background: url('http://i.minus.com/ibhqW9Buanohx2.png') center left no-repeat, linear-gradient(top, #d6d7d7, #dee0e0);
      border: 1px solid #a1a3a3;
      border-radius: 4px;
      box-shadow: 0 1px #fff;
      box-sizing: border-box;
      color: #696969;
      height: 39px;
      margin: 31px 0 0 29px;
      padding-left: 37px;
      transition: box-shadow 0.3s;
      width: 240px;
    }
    input[type="password"]:focus, input[type="text"]:focus {
      box-shadow: 0 0 4px 1px rgba(55, 166, 155, 0.3);
      outline: 0;
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
</style>