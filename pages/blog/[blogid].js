

import { useState } from 'react'
import { db } from '../../firebase'
import { useRouter } from 'next/router'


const Blog = ({singleBlog,user,allComments}) => {
    console.log(allComments)
    const [comment,setComment]=useState("")
    const [allText,setAllText]=useState(allComments)

    const router = useRouter()
    const { blogid } = router.query


    const makeComment=async()=>{
      db.collection("blogs").doc(blogid).collection("comment").add({
        text:comment,
        name:user.displayName
      })
      M.toast({html: "your comment hasbeen saved",classes:"green"}) 
     const commentList= await db.collection('blogs').doc(blogid).collection('comment').get()
     setAllText(commentList.docs.map(comDoc=>comDoc.data()))
   

    }
  return (
    
    <div className="center">
        
        <div className="card" key={singleBlog.createdAt}>
          <h2>{singleBlog.title}</h2>
          <h5>Created On - {new Date(singleBlog.createdAt).toDateString()}</h5>
          <img src={singleBlog.imageUrl} alt={singleBlog.title} />
          <p>{singleBlog.body}</p>
        </div>
        {
          user?
          <>
            <div className="input-field">
              <input type="text" 
              placeholder="add a comment" 
              value={comment} 
              onChange={(e)=>setComment(e.target.value)}/> 
            </div>
            <button className="btn #311b92 deep-purple darken-4" onClick={makeComment}>Make comment</button>
          </>:
          <>
            <h3>Please Login to Comment !!</h3>
          </>
        }
        
        <hr/>
        <div className='left-align'>
          <h3>Comments</h3>
          {
            allText.map(item=>{
              return (
                <h6 key={item.name}><span>{item.name}</span> {item.text}</h6>
              )
            })
          }
        </div>
        
        <style jsx global>
                {`
                span{
                    font-weight:500;
                }
                body{
                    color:black
                }
                img{
                    width:100%;
                    max-width:700px;
                }
                `}
        </style>
            
    </div>
    
  )
}

export async function getServerSideProps({params:{blogid}}) {
  const result =  await db.collection('blogs').doc(blogid).get()
  const allCommetsSnap = await db.collection('blogs').doc(blogid).collection('comment').get()

 const allComments =  allCommetsSnap.docs.map(comDocSnap=>comDocSnap.data())

 return {
   props: {
       singleBlog:{
           ...result.data(),
           createdAt:result.data().createdAt.toMillis()
       },
       allComments
   },
 }
}

export default Blog