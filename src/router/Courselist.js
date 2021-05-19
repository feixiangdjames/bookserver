import React from 'react';
import {getBookList} from '../api/book'
import { Layout,Collapse } from 'antd';
import {getCookie,setCookie} from '../api/cookie'
import {withRouter,Link} from 'react-router-dom'

import {loginCheck} from '../api/person'

const { Panel } = Collapse;
const { Header, Content } = Layout;

class Courselist extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state ={
            booklist:null
        }
    }
    handleClick(event){
        this.props.history.push("/");
    }

    async componentWillMount(){
        let value=getCookie('bookuser');
        if(!value){
            this.handleClick();
        }
   /*   let code=await loginCheck();
      if(!code){
        this.handleClick();
      }*/
    }
   async componentDidMount(){

     let localStorage=window.localStorage;

     if(localStorage.booklist){
       this.setState({
         booklist:JSON.parse(localStorage.booklist)
       })

     }else {
       let booklist=await getBookList();
       localStorage.booklist= JSON.stringify(booklist);

       this.setState({
         booklist:JSON.parse(localStorage.booklist)
       })
     }




    }
    render(){
        if(!this.state.booklist){
            return ''
        }else {
            const data=this.state.booklist;
            let level=[];
            let tempLevel=['MAGENTA','ROUGE','JAUNE','BLEU','VERT','ORANGE','VIOLET','OR','ARGENT','RUBIS','SAPHIR'];
            for(let index in tempLevel){
                level.push(tempLevel[index]+" A");
                level.push(tempLevel[index]+" B");
            }
            // noinspection JSAnnotator
            return <Layout className="layout">
                <Header>
                    <div className="title">TOTAL:2</div>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <Collapse accordion style={{margin:'auto',width:'50%'}}>
                            {

                                level.map(item=>{
                                    let levelname=item;
                                    let readBook=getCookie('bookInfo').split(',');
                                  console.log(readBook);
                                  let book=data.filter(item => {
                                        return item.LEVEL===levelname});
                                        return <Panel className={levelname} header={item+"("+book.length+")"} style={{fontSize:'20px'}} key={item}>
                                        {
                                            book.map(
                                                item=>{
                                                    let bookStyle=readBook.includes(item.BOOK_ID.toString())?{'background-color':'#6ec071'}:{};
                                                    return <Link to={{pathname:'/Course',query:{BOOK_ID:item.BOOK_ID}}}>
                                                      <div className="bookbtn" style={bookStyle} key={item.BOOK_ID}>{item.BOOk_NAME}</div>
                                                    </Link>

                                                }
                                            )
                                        }
                                    </Panel>
                                })
                            }

                        </Collapse>,
              </div>
                </Content>
            </Layout>
        }
    }
}

export default withRouter(Courselist);