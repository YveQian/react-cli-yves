import React, {lazy, Suspense} from "react"
import { Route,BrowserRouter,Link,Redirect ,Switch, useRouteMatch, useParams } from "react-router-dom"
import App2 from "./index.tsx"
import LoginIndex from "./login"

// const layoutList = [
//     {
//         path:'/admin/layout/articles/articlesList',
//         component:articlesListIndex,
//         exact:true
//     },
//     {
//         path:'/admin/layout/articles/articleCheck',
//         component:articlesCheckIndex,
//         exact:true
//     },
//     {
//         path:'/admin/layout/articles/articlesIsTop',
//         component:articlesIsTopIndex,
//         exact:true
//     },
//     // {
//     //     path:'/admin/layout/articles/articlesList/ArticleCommon',
//     //     component:Article,
//     //     exact:true
//     // }
// ]

class AppRouter2 extends React.Component {
    render(){
        return (
           
            <BrowserRouter>
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                    <Switch>
                        <Route path="/page2" component={App2} >
                            <Route path="/page2/login" component={LoginIndex} />
                            {/* <Route exact path="/admin/resume" component={ResumeIndex}/>
                            <Route exact path="/admin/user" component={UserIndex}/>
                            <Route path="/admin/layout/articles"  render={() =>
                                <LayoutIndex>
                                    {
                                        layoutList.map((route,index)=>{         
                                        return route.exact?<Route exact path={route.path} component={route.component} key={index}/>:<Route path={route.path} component={route.component}  key={index}/>
                                        })
                                    }
                                </LayoutIndex>
                            } /> */}
                        </Route>
 
                        
                        
                    </Switch>
                {/* </Suspense> */}
            </BrowserRouter>
        )
    }
}
export default AppRouter2;