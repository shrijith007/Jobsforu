<script>
    import job from "./store";
    import {jobs} from "./store";
    import Joblist from "../Components/Joblist.svelte";
    
    
    let done= false;
    let q="";
    let l="";
    let rbc="";
    let url ="";
    let joblists=[];
    
    
    
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
    console.log(joblist)
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
    
    
    
    <div class="form" >
                <p> <input  on:input={()=>{ done=true }}  type='text' bind:value={q}></p>
                <p> <input  type='text' bind:value={l} ></p>
                <p> <input type='text' bind:value={rbc} ></p>
                <p class="submit">
                    {#if done===true}
                    <button  on:click="{fetchdata(q,l,rbc)}"> Submit</button>
                    {/if}
                    <p>
                </div>
    
    
    
    
        <section>
            {#each  joblists as job}
            <div>
                <Joblist job={job}/>
            </div>
        {/each} 
        </section>
    
        <style>
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
            
            .form {
                padding-top:4%;
            }
            
            p{
                padding-left: 10%;
                display: inline-flex;
            }
            
            .submit{
                align-self: center;
            }
            
            </style>
            
            