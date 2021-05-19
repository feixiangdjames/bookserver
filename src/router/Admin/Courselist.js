import React from 'react';
import {getBookList} from '../../api/book'
import { Layout,Collapse } from 'antd';
import {getCookie,setCookie} from '../../api/cookie'
import {withRouter,Link} from 'react-router-dom'


const { Panel } = Collapse;
const { Header, Content } = Layout;

class CourselistAdmin extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state ={
            booklist:null
        }
    }
    handleClick(event){
        this.props.history.push("/");
    }

    componentWillMount(){
        let value=getCookie('bookuser');
        if(!value){
            this.handleClick();
        }
    }
   async componentDidMount(){
        let booklist=await getBookList();
        this.setState({
            booklist
        })
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
                                    let book=data.filter(item => {
                                        return item.LEVEL===levelname});
                                    return <Panel className={levelname} header={item+"("+book.length+")"} style={{fontSize:'20px'}} key={item}>
                                        {
                                            book.map(
                                                item=>{
                                                    return<Link to={{pathname:'/book/zone/admin',query:{BOOK_ID:item.BOOK_ID}}}>
                                                      <div className="bookbtn">
                                                        {item.BOOk_NAME}
                                                      </div>
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

export default withRouter(CourselistAdmin);