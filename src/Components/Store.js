import {writable} from "svelte/store";


export const jobs= writable([]);
export const bookmarklist=writable([]);
export const job={
setjobs:(results)=>{
        jobs.set(results)
    },
setbookmarks:(bookmark)=>{
        bookmarklist.set(bookmark)
    },
removebookmark:(id)=>{
    bookmarklist.update(items=>{
        return items.filter(i=>i.id !=id);
    });
}
    
}



