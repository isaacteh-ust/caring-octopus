import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";
import { getPages, Link, withPrefix } from "../utils";
import components, { Layout } from "../components/index";
import styled from "styled-components";
import { FaCaretDown, FaFileExcel } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser

const StyledFilter = styled.div`
  background-color: #1d242c;
  color: white;
  display: flex;
  padding: 80px 70px 20px 150px;

  .filter-container {
    display: flex;
    flex-direction: row;
    flex: 5;
  }

  .sort-container {
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  .insights-label {
    padding-right: 20px;
    font-size: 16px;
  }

  .insights-dropdown {
    padding-right: 20px;
  }

  .insights-dropdown .dropbtn {
    font-size: 16px;
    font-weight: bold;
    border: none;
    outline: none;
    color: white;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    cursor: pointer;
  }

  .dropdown-content a:hover {
    background-color: #ddd;
    cursor: pointer;
  }

  .insights-dropdown:hover .dropdown-content {
    display: block;
    cursor: pointer;
  }
`;

const StyledMedium = styled.div`
  display: flex;
  justify-content: space-between;

  .medium-top {
    flex: 2;
    margin-right: 100px;
  }
  .medium-recommended {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .recommend-label {
      font-size: 13px;
      line-height: 16px;
      letter-spacing: 2.2px;
      color: #231f20;
      text-transform: uppercase;
      padding-bottom: 20px;
    }
  }

  .recommend-container {
    .recommend-card {
      display: flex;
      flex-direction: row;
      padding: 20px;

      .recommend-index {
        font-size: 44px;
        line-height: 50px;
        color: #231f20;
        padding: 0 10px;
        width: 30px;
        text-align: center;
      }

      .recommend-subcard {
        display: flex;
        flex-direction: column;
        .recommend-image {
          width: 600px;
          padding-bottom: 10px;
        }
        .thumbnail-image {
          width: 340px;
          height: 220px;
          padding-bottom: 10px;
        }
        .recommend-tag {
          font-size: 10px;
          line-height: 16px;
          letter-spacing: 2.2px;
          color: #0093a8;
          text-transform: uppercase;
          padding-bottom: 5px;
          width: 300px;
          font-family: fort-bold;
        }
        .recommend-title {
          font-weight: 800;
          font-size: 16px;
          line-height: 20px;
          color: #231f20;
          width: 300px;
          padding-bottom: 5px;
          font-family: fort-bold;
        }
        .normal-title {
          font-weight: 800;
          font-size: 16px;
          line-height: 20px;
          color: #231f20;
          padding-bottom: 5px;
          font-family: fort-bold;
        }
        .thumbnail-title {
          font-weight: 800;
          font-size: 16px;
          line-height: 20px;
          color: #231f20;
          padding-bottom: 5px;
          width: 300px;
          height:40px;
        }
        .recommend-date {
          font-size: 13px;
          line-height: 21px;
          color: #231f20;
          padding-bottom: 5px;
          width: 300px;
        }
        .recommend-button {
          display: flex;
          align-items: center;
          cursor: pointer;
          width: 300px;

          .button-label {
            font-size: 13px;
            line-height: 16px;
            color: #000000;
            padding-right: 10px;
          }
          svg {
            color: #006e74;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 801px) {
    ol.tab-list {
      margin: 0px;
      padding: 0px;
      text-align: center;
    }
    display: none;
  }
`;

export const query = graphql`
  query($url: String) {
    sitePage(path: { eq: $url }) {
      id
    }
  }
`;

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_posts: [],
      selected_posts: [],
      latest_post: {},
      recommended_post: [],
      tags: [],
      primary_tags: [],
      toggleFilter: false,
      paginate: {
        offset: 0,
        data: [],
        perPage: 3,
        currentPage: 0
      }
    };
    this.findPrimaryTag = this.findPrimaryTag.bind(this);
    this.findTags = this.findTags.bind(this);
    this.myRef = React.createRef();
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    let oldPaginate = this.state.paginate;
    let display_posts = _.orderBy(
      getPages(this.props.pageContext.pages, "/insights"),
      "frontmatter.date",
      "desc"
    );
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.paginate.perPage;
    this.setState({
        paginate:{
          ...oldPaginate,
          currentPage: selectedPage,
          offset: offset
        }
    }, () => {
        this.getPagesPaginate(display_posts)
    });

};

  getPagesPaginate(display_posts){
    // will trigger render twice
    const pages = display_posts;
                //getting which portion of pages to display
    //console.log('slice is ', this.state.paginate.offset, this.state.paginate.perPage)
    const slice = pages.slice(this.state.paginate.offset, this.state.paginate.offset + this.state.paginate.perPage);
    //console.log('new page count is ', this.state.pageCount);
    //console.log('pages ', pages, this.state.paginate.perPage)
    this.setState({
        pageCount: Math.ceil(pages.length / this.state.paginate.perPage),
        pageToDisplay : slice
    })
  }

  componentDidMount() {
    let display_posts = _.orderBy(
      getPages(this.props.pageContext.pages, "/insights"),
      "frontmatter.date",
      "desc"
    );

    let temp_primary_tags = ["All"];
    let temp_tags = ["All"];
    let temp_recommended = [];

    display_posts.map((item, index) => {
      if (!_.includes(temp_primary_tags, item.frontmatter.primary_tag)) {
        temp_primary_tags.push(item.frontmatter.primary_tag);
      }
      temp_tags.push.apply(temp_tags, item.frontmatter.tags);

      if (item.frontmatter.recommended) {
        temp_recommended.push(item);
      }
    });
    temp_tags = _.uniq(temp_tags);
    this.setState({ all_posts: display_posts });
    this.setState({ selected_posts: display_posts });
    this.setState({ latest_post: display_posts[0] });
    this.setState({ recommended_post: temp_recommended });
    this.setState({ tags: temp_tags });
    this.setState({ primary_tags: temp_primary_tags });
    this.getPagesPaginate(display_posts);
  }

  findPrimaryTag(tag) {
    console.log(tag.target.innerHTML);
    let temptag = tag.target.innerHTML.toLowerCase();
    let temp = [];
    // const { all_posts } = this.state;
    if (temptag !== "all") {
      this.state.all_posts.map((item, index) => {
        if (temptag === item.frontmatter.primary_tag) {
          temp.push(item);
        }
      });
      this.setState({ selected_posts: temp });
    }

    window.scrollTo({
      top: this.myRef.current.offsetTop,
      behavior: "smooth",
    });
  }
  findTags(tag) {
    console.log(tag.target.innerHTML);
    let temptag = tag.target.innerHTML.toLowerCase();
    let temp = [];
    const { all_posts } = this.state;
    if (temptag !== "all") {
      all_posts.map((item, index) => {
        if (_.includes(item.frontmatter.tags, temptag)) {
          temp.push(item);
        }
      });
      this.setState({ selected_posts: temp });
    }
    window.scrollTo({
      top: this.myRef.current.offsetTop,
      behavior: "smooth",
    });
  }
  render() {
    console.log('page count during render is ', this.state.pageCount)
    const {
      all_posts,
      selected_posts,
      latest_post,
      recommended_post,
      tags,
      primary_tags,
      paginate,
      pageCount,
      pageToDisplay
    } = this.state;

    console.log('to display', pageToDisplay);
    return (
      <Layout {...this.props}>
        {_.map(
          _.get(this.props, "pageContext.frontmatter.sections", null),
          (section, section_idx) => {
            let component = _.upperFirst(
              _.camelCase(_.get(section, "type", null))
            );
            let Component = components[component];
            return (
              <Component
                key={section_idx}
                {...this.props}
                section={section}
                site={this.props.pageContext.site}
              />
            );
          }
        )}
        <StyledFilter>
          <div className="filter-container">
            <div className="insights-label">Filter By:</div>
            <div className="insights-dropdown">
              <button className="dropbtn">
                Page Type
                <FaCaretDown />
              </button>

              <div className="dropdown-content">
                {_.map(primary_tags, (tag, tag_idx) => (
                  <a onClick={this.findPrimaryTag}>{_.startCase(tag)}</a>
                ))}
              </div>
            </div>
            <div className="insights-dropdown">
              <button className="dropbtn">
                Industries
                <FaCaretDown />
              </button>
              <div className="dropdown-content">
                {_.map(tags, (tag, tag_idx) => (
                  <a onClick={this.findTags}>{_.startCase(tag)}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="sort-container">
            {/* <div className="insights-label">Sort By:</div>
            <div className="insights-dropdown">Newest</div> */}
          </div>
        </StyledFilter>
        <div className="insights outer">
          <div className="inner">
            <StyledMedium>
              <div className="medium-top">
                {/* <div className="card"> */}

                <article className="recommend-container">
                  <div className="recommend-card">
                    <div className="recommend-subcard">
                      {_.get(latest_post, "frontmatter.thumb_image", null) && (
                        <Link
                          className="recommend-image"
                          to={withPrefix(_.get(latest_post, "url", null))}
                        >
                          <img
                            src={withPrefix(
                              _.get(
                                latest_post,
                                "frontmatter.thumb_image",
                                null
                              )
                            )}
                            alt={_.get(
                              latest_post,
                              "frontmatter.thumb_image_alt",
                              null
                            )}
                            className="recommend-image"
                          />
                        </Link>
                      )}
                      <div className="recommend-tag">
                        {_.get(latest_post, "frontmatter.primary_tag", null)}
                      </div>
                      <div className="normal-title">
                        {_.get(latest_post, "frontmatter.title", null)}
                      </div>
                      <div className="recommend-date">
                        {_.get(latest_post, "frontmatter.date", null)}
                      </div>
                      <Link
                        className="recommend-image"
                        to={withPrefix(_.get(latest_post, "url", null))}
                      >
                        <div className="recommend-button">
                          <span className="button-label">Read more</span>
                          <svg
                            class="icon"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M18.055 10.522v-4.506l5.984 5.984-5.984 5.984v-4.506h-18.094v-2.957h18.094z"></path>
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </article>
                {/* </div> */}
              </div>
              <div className="medium-recommended">
                {/* <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="recommend-label">Recommended</div>
                </div> */}
                <div className="recommend-label">Recommended</div>
                {_.map(recommended_post, (post, post_idx) => (
                  <article className="recommend-container">
                    <div className="recommend-card">
                      <div className="recommend-index">{post_idx + 1}</div>
                      <div className="recommend-subcard">
                        <div className="recommend-tag">
                          {post.frontmatter.primary_tag}
                        </div>
                        <div className="recommend-title">
                          {post.frontmatter.title}
                        </div>
                        <div className="recommend-date">
                          {post.frontmatter.date}
                        </div>
                        <Link
                          className="recommend-button"
                          to={withPrefix(_.get(post, "url", null))}
                        >
                          <div className="recommend-button">
                            <span class="button-label">Read more</span>
                            <svg
                              class="icon"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M18.055 10.522v-4.506l5.984 5.984-5.984 5.984v-4.506h-18.094v-2.957h18.094z"></path>
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </StyledMedium>

            <div ref={this.myRef}></div>
            <StyledMedium style={{ "flex-wrap": "wrap" }}>
              {_.map(pageToDisplay, (post, post_idx) => (
                <article className="recommend-container">
                  <div className="recommend-card">
                    <div className="recommend-subcard">
                      <div
                        className="recommend-tag"
                        style={{ width: "300px", fontWeight: "bold" }}
                      >
                        {_.get(post, "frontmatter.primary_tag", null)}
                      </div>
                      {_.get(post, "frontmatter.thumb_image", null) && (
                        <Link
                          className="thumbnail-image"
                          to={withPrefix(_.get(post, "url", null))}
                        >
                          <img
                            src={withPrefix(
                              _.get(post, "frontmatter.thumb_image", null)
                            )}
                            alt={_.get(
                              post,
                              "frontmatter.thumb_image_alt",
                              null
                            )}
                            className="thumbnail-image"
                          />
                        </Link>
                      )}

                      <div className="thumbnail-title">
                        {_.get(post, "frontmatter.title", null)}
                      </div>
                      <div
                        className="recommend-date"
                        style={{ width: "300px" }}
                      >
                        {_.get(post, "frontmatter.date", null)}
                      </div>
                      <Link
                        className="recommend-image"
                        style={{ width: "300px" }}
                        to={withPrefix(_.get(post, "url", null))}
                      >
                        <div className="recommend-button">
                          <span class="button-label">Read more</span>
                          <svg
                            class="icon"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M18.055 10.522v-4.506l5.984 5.984-5.984 5.984v-4.506h-18.094v-2.957h18.094z"></path>
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </StyledMedium>
          </div>
        </div>
        <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
      </Layout>
      
    );
  }
}
