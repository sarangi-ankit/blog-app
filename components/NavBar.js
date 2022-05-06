import Link from "next/link"
import { auth } from "../firebase"

const NavBar = ({user}) => {


  return (
    <div>
        <nav>
            <div className="nav-wrapper #311b92 deep-purple darken-4">
            {/* <Link href="/"> <a className="brand-logo">Blogger</a></Link> */}
            <Link href="/"><a className="brand-logo">Blogger</a></Link>
            <ul id="nav-mobile" className="right ">
            {
              user?
              <>
                <li><Link href="/createblog"><a >Create Blog</a></Link></li>
                <li> <Link href="/login"><a><button className="btn red" onClick={()=>auth.signOut()}>Logout</button></a></Link></li>
              </>
              :<>
              <li><Link href="/signup"><a >Signup</a></Link></li>
              <li><Link href="/login"><a >Login</a></Link></li>
              </>
            }
                
                
            </ul>
            </div>
        </nav>
    </div>
  )
}

export default NavBar