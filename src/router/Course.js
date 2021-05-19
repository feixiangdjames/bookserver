import React from 'react';
import {Link} from "react-router-dom";

import { Layout, Carousel,Breadcrumb,Button } from 'antd';
import {LeftSquareFilled,RightSquareFilled,ForwardOutlined,CheckSquareTwoTone} from '@ant-design/icons'
import {getBook,overWritePhrase,getLevel,setLevel,getCurrentLevel} from '../api/book'
import {setReadBook} from '../api/person'

import '../static/css/Course.css'

import Audio from "./Course/play.js";

import {getCookie,setCookie} from "../api/cookie";

const { Header, Content, Footer } = Layout;

class Course extends React.Component{
constructor(props,context){
    super(props,context);
    this.filename='http://readbook.myprojectcms.tk/img/';
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.nextBook = this.nextBook.bind(this);
    this.readBook=this.readBook.bind(this);

    this.state={
        book:null,
        BOOK_ID:null,
        width:33,
        top:3,
        left:3
      , fontSize:30
    }

  }
     next() {
       console.log(this.slider.innerSlider);
       this.slider.innerSlider.slickNext();
          }

     prev() {
        this.slider.innerSlider.slickPrev();
         }

     async nextBook(){

    let urlInfo= await getBook({BOOK_ID:parseInt(this.state.BOOK_ID.BOOK_ID)+1});
       let urlCurrentLevel=await getCurrentLevel(this.state.BOOK_ID);
        this.setState({
            book:JSON.parse(JSON.stringify(urlInfo)).sort((a,b)=>{
              return a.PAGE_CODE-b.PAGE_CODE
            }),
            pageNum:0,
            show:[],
            value:'',
            level:'',
            BOOK_ID:{BOOK_ID:parseInt(this.state.BOOK_ID.BOOK_ID)+1},
            bookLevel:urlCurrentLevel
        })
       setCookie('book',this.state.BOOK_ID.BOOK_ID);
       this.slider.innerSlider.slickGoTo(0);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleClick(event){
        this.props.history.push("/");
    }

    readBook(){

      let bookId=this.state.BOOK_ID.BOOK_ID+"";
      let bookInfo=getCookie("bookInfo").split(",");

         if(bookInfo.includes(bookId)){

         }else {
             bookInfo.push(bookId);
             setCookie('bookInfo',bookInfo.join(','));
             setReadBook({bookId,
             user:getCookie('user')});
         }

      this.setState({twoToneColor:'cornflowerblue'})

    }
    componentWillMount() {
        let value=getCookie('bookuser');
        if(!value){
            this.handleClick();
        }else {
            if(this.props.location.query){
                this.setState({BOOK_ID:{BOOK_ID:this.props.location.query.BOOK_ID}});
                setCookie('book',this.props.location.query.BOOK_ID);
            }else {
                this.setState({BOOK_ID:{BOOK_ID:getCookie('book')}})
            }

        }
}

  async componentDidMount(){

      let urlInfo= await getBook(this.state.BOOK_ID);
      let urlLevel= await getLevel();
      let urlCurrentLevel=await getCurrentLevel(this.state.BOOK_ID);

      this.setState({
          book:JSON.parse(JSON.stringify(urlInfo)).sort((a,b)=>{
            return a.PAGE_CODE-b.PAGE_CODE
          }),
          pageNum:0,
          show:[],
          value:'',
          allLevel:JSON.parse(JSON.stringify(urlLevel)),
          level:'',
          bookLevel:urlCurrentLevel,
          twoToneColor:"#eb2f96"
      })

  }
  render(){
      if(!this.state.book) {return <div>''</div>}
      else{
          let isFirst=this.state.pageNum===0;
          let left=isFirst?{'visibility':'hidden'}:{};
          let isEnd=this.state.pageNum===this.state.book.length-1;
          let right= isEnd?{'display':'none'}:{};
          let readTag= isEnd?{'display':'block'}:{'display':'none'};
          return <Layout className="layout">
              <Header style={{display:'flex','justify-content':'space-between'}}>

                  <Link to={{pathname:'/list',query:{BOOK_ID:10}}}>
                      <Button type="primary">BACK TO BOOKLIST</Button>
                  </Link>
                  <div className="title" style={{'font-size':'30px'}}>{this.state.bookLevel}</div>
              </Header>
              <Content className="ContentBox">
                  <div className="title"></div>
                  <div className="site-layout-content">
                      <Carousel dots={false} ref={el => {this.slider = el}} afterChange={index=>this.setState({pageNum:index})}>
                          {this.state.book.map((item,index)=>{
                              const account=item.PAGE_INFO.length;

                            let width=(item.WIDTH||this.state.width)+'vw';
                            let top=(item.TOP||this.state.top)+'vh';
                            let left=(item.LEFT||this.state.left)+'vw';
                            let fontSize=(this.state.fontSize===30?item.FONTSIZE||this.state.fontSize:this.state.fontSize)+'px';
                            let styleData={width,top,left,fontSize};

                              return <div className="slideBox" key={index}>
                                  <img src={this.filename + item.PAGE_NAME.slice(7) + ".jpg"} alt={{}}/>
                                  <div className='dialogue' style={styleData}>
                                      {item.PAGE_INFO.map((item,index)=>{
                                        function switchFont (n,f) {
                                          if(n>35&&f==30){
                                            return 'smallText'
                                          }else if(n>20&&f==30){
                                            return 'midText'
                                          };

                                          return ''
                                        }
                                          return <p className={switchFont(account,this.state.fontSize)}

                                          >{item.word}</p>
                                      })}
                                  </div>
                              </div>
                          })}
                      </Carousel>

                  </div>
              </Content>
              <div className="playBox">

                  <LeftSquareFilled className="slide-left" onClick={this.prev} style={left}/>
                  <Audio
                      src={
                          this.filename+this.state.book[this.state.pageNum].PAGE_NAME+'.mp3'
                      }
                      id={this.state.book.name+this.state.pageNum}
                  />
                  <RightSquareFilled className="slide-right" onClick={this.next} style={right}/>
                  <CheckSquareTwoTone className="slide-right" twoToneColor={this.state.twoToneColor} onClick={this.readBook} style={readTag}/>
              </div>
          </Layout>
      }

  }
}

export default Course;