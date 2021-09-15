import React, {lazy, Suspense} from "react"
import { Route,BrowserRouter,Link,Redirect ,Switch, useRouteMatch, useParams } from "react-router-dom"
import App from "./index.js"
import LoginIndex from "./login"
import LayoutIndex from "./layout"
// const articlesListIndex = lazy(()=>import("./layout/pages/articlesList"))
// const articlesCheckIndex = lazy(()=>import("./layout/pages/articleCheck"))
// const articlesIsTopIndex = lazy(()=>import("./layout/pages/articlesIsTop"))
// const Article = lazy(()=>import("../../components/articles.js"))
// const ResumeIndex = lazy(()=>import("./resume"))
// const UserIndex = lazy(()=>import("./user"))
import articlesListIndex from "./layout/pages/articlesList"
import articlesCheckIndex from "./layout/pages/articleCheck"
import articlesIsTopIndex from "./layout/pages/articlesIsTop"
import Article from "@/../components/articles.js"

import ResumeIndex from "./resume"
import UserIndex from "./user"

const layoutList = [
    {
        path:'/layout/articles/articlesList',
        component:articlesListIndex,
        exact:true
    },
    {
        path:'/layout/articles/articleCheck',
        component:articlesCheckIndex,
        exact:true
    },
    {
        path:'/layout/articles/articlesIsTop',
        component:articlesIsTopIndex,
        exact:true
    },
    {
        path:'/layout/articles/articlesList/ArticleCommon',
        component:Article,
        exact:true
    }
]

class AppRouter extends React.Component {
    render(){
        return (
           
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/" component={App} >
                            <Route path="/login" component={LoginIndex} />
                            <Route exact path="/resume" component={ResumeIndex}/>
                            <Route exact path="/user" component={UserIndex}/>
                            <Route path="/layout/articles"  render={() =>
                                <LayoutIndex>
                                    {
                                        layoutList.map((route,index)=>{         
                                        return route.exact?<Route exact path={route.path} component={route.component}/>:<Route path={route.path} component={route.component}/>
                                        })
                                    }
                                </LayoutIndex>
                            } />
                            {/* <Redirect to="/login" /> */}
                        </Route>
 
                        
                        
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    }
}
export default AppRouter;