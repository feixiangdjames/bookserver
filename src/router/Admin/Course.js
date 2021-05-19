import React from 'react';
import {Link} from "react-router-dom";

import { Layout, Carousel,Breadcrumb,Button } from 'antd';
import {LeftSquareFilled,RightSquareFilled,ForwardOutlined} from '@ant-design/icons'
import {getBook,overWritePhrase,getLevel,setLevel,getCurrentLevel,setWordPositon} from '../../api/book'

import '../../static/css/Course.css'

import Audio from "../Course/play.js";
import {getCookie,setCookie} from "../../api/cookie";

const { Header, Content, Footer } = Layout;

class CourseAdmin extends React.Component{

  constructor(props,context){
    super(props,context);
    this.filename='http://readbook.myprojectcms.tk/img/';
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.nextBook = this.nextBook.bind(this);
    this.inputhandleChange= this.inputhandleChange.bind(this);
    this.handleTime=this.handleTime.bind(this);

    this.state={
      book:null,
      BOOK_ID:null,
      width:33,
      top:3,
      left:3,
      fontSize:30
    };

  }

  handleTime(value){
    if(this.state.currentTime!==value){
      this.setState({currentTime:value})
    }
  }

  next() {
    this.setState({
      width:33,
      top:3,
      left:3,
      fontSize:30
    })
    this.slider.innerSlider.slickNext();
  }

  prev() {
    this.setState({
      width:33,
      top:3,
      left:3,
      fontSize:30
    })
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
      bookLevel:urlCurrentLevel,
      width:33,
      top:3,
      left:3,
      fontSize:30
    })
    setCookie('book',this.state.BOOK_ID.BOOK_ID);
    this.slider.innerSlider.slickGoTo(0);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  inputhandleChange(event){
    switch (event.target.id) {
      case 'aa':
        this.setState({top: event.target.value});
        break;
      case 'bb':
        this.setState({width: event.target.value});
        break;
      case 'cc':
        this.setState({left: event.target.value});
        break;
      case 'dd':
        this.setState({fontSize: event.target.value});
        break;
    }

  }

  handleClick(event){
    this.props.history.push("/");
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

    let urlInfo = await getBook(this.state.BOOK_ID);
    let urlLevel = await getLevel();
    let urlCurrentLevel =await getCurrentLevel(this.state.BOOK_ID);

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
      width:33,
      top:3,
      left:3,
      fontSize:30,
      currentTime:""
    })

  }

  render(){
    if(!this.state.book) {

      return <div>''</div>}
    else{
      let isFirst=this.state.pageNum===0;
      let left=isFirst?{'visibility':'hidden'}:{};
      let isEnd=this.state.pageNum===this.state.book.length-1;
      let right= isEnd?{'visibility':'hidden'}:{};
      return <Layout className="layout">
        <Header style={{display:'flex','justifyContent':'space-between'}}>

          <Link to={{pathname:'/booklist/zone/admin',query:{BOOK_ID:10}}}>
            <Button type="primary">BACK TO BOOKLIST</Button>
          </Link>
          <div className="title" style={{'fontSize':'30px'}}>{this.state.level}{this.state.BOOK_ID.BOOK_ID}{this.state.bookLevel}</div>

        </Header>
        <Content className="ContentBox">
          <div className="title"></div>
          <div className="site-layout-content">
            <Carousel dots={false} ref={el => {this.slider = el}} afterChange={index=>this.setState({pageNum:index})}>

              {
                this.state.book.map((item,index)=>{
                    const account=item.PAGE_INFO.length;
                    let width=(this.state.width===33?item.WIDTH||this.state.width:this.state.width)+'vw';
                    let top=(this.state.top===3?item.TOP||this.state.top:this.state.top)+'vh';
                    let left=(this.state.left===3?item.LEFT||this.state.left:this.state.left)+'vw';
                    let fontSize=(this.state.fontSize===30?item.FONTSIZE||this.state.fontSize:this.state.fontSize)+'px';
                    let styleData={width,top,left,fontSize};

                    return <div className="slideBox" key={item.ID}>

                      <img src={this.filename + item.PAGE_NAME.slice(7) + ".jpg"} alt={{}}/>

                      <div className='dialogue' style={styleData}>

                        {
                          //this.state.pageNum===index?
                          item.PAGE_INFO.map((item,index)=>{

                            if(this.state.show[index]){
                              let pageName=this.state.book[this.state.pageNum].PAGE_NAME;
                              let inputValue;
                              return <input type={'text'} value={this.state.value}
                                            onChange={this.handleChange}
                                            ref={input => inputValue = input}
                                            onBlur={async ()=>{
                                              let result= await overWritePhrase({pageName,index,value:this.state.value});

                                              let temp=this.state.book;
                                              temp=temp.map(item=>item.PAGE_NAME===result.PAGE_NAME?item=result:item);
                                              this.setState({book:temp,show:[]});
                                            }}>
                              </input>
                            }else{
                              function switchFont (n,f) {
                                if(n>35&&f==30){
                                  return 'smallText'
                                }else if(n>20&&f==30){
                                  return 'midText'
                                };
                                return ''
                              }
                              return <p className={switchFont(account,this.state.fontSize)}
                                        style={!this.state.show[index]?{}:{visibility:'hidden'}}
                                // click to modify the current field
                                        onClick={()=>{
                                          let a=[];
                                          a[index]=true;
                                          this.setState({show:a,value:item.word})
                                        }}
                                        key={index}>

                                {item.word}
                              </p>
                            }
                          })}

                      </div>
                    </div>
                  }
                )}
            </Carousel>
            <div className="rangebox">
              <Button type="primary" onClick={()=>{
                let {width,top,left,fontSize}=this.state;
                let pageName=this.state.book[this.state.pageNum]['PAGE_NAME']
                setWordPositon({width,top,left,fontSize,pageName})}
              }>Commit</Button>
              <div>
                <input
                  id="aa"
                  style={{margin:'1px'}}
                  type="range"
                  min="0" max="100"
                  value={this.state.book[this.state.pageNum]['TOP']||this.state.top}
                  onChange={this.inputhandleChange}
                  step="1"/>
              </div>
              <div>
                <input
                  id="bb"
                  style={{margin:'1px'}}
                  type="range"
                  min="0" max="100"
                  value={this.state.book[this.state.pageNum]['WIDTH']||this.state.width}
                  onChange={this.inputhandleChange}
                  step="1"/>
              </div>
              <div>
                <input
                  id="cc"
                  style={{margin:'1px'}}
                  type="range"
                  min="0" max="100"
                  value={this.state.book[this.state.pageNum]['LEFT']||this.state.left}
                  onChange={this.inputhandleChange}
                  step="1"/>
              </div>
              <div>
                <input
                  id="dd"
                  style={{margin:'1px'}}
                  type="range"
                  min="15" max="50"
                  value={this.state.fontSize}
                  onChange={this.inputhandleChange}
                  step="1"/>
              </div>
            </div>
            <div className="levelBox" >
              {this.state.allLevel.map((item,index)=>{
                return <div onClick={async ()=>{
                  let result=await setLevel({
                    level:item,
                    bookId:this.state.BOOK_ID.BOOK_ID
                  });
                  let urlCurrentLevel=await getCurrentLevel(this.state.BOOK_ID);
                  this.setState({level:result.LEVEL,bookLevel:urlCurrentLevel})
                }} key={index}>
                  {item}
                </div>
              })}
            </div>
          </div>
        </Content>
        <div className="playBox">

          <LeftSquareFilled className="slide-left" onClick={this.prev} style={left}/>

          <Audio
            src={
              this.filename+this.state.book[this.state.pageNum].PAGE_NAME+'.mp3'
            }
            id={this.state.book.name+this.state.pageNum}
            handleTime={this.handleTime}
          />
          <RightSquareFilled className="slide-right" onClick={this.next} style={right}/>
          <ForwardOutlined className="slide-right" onClick={this.nextBook}/>
        </div>
      </Layout>
    }

  }
}

export default CourseAdmin;