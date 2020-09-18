import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import HTMLMetadata from "../components/HTMLMetadata";
import Pagination from "../components/Pagination";
import ImgNonStreched from "../components/ImgNonStreched";
import ClockIcon from "../components/ClockIcon";

function PostListTemplate({ data, location, pageContext }) {
  const blog = data.fireblog.blog;
  const { postsPerPage, readMoreText } = data.site.siteMetadata;

  const { pagination, items: posts } = data.fireblog.posts;
  return (
    <Layout
      location={location}
      headerTitle={blog.name}
      headerSubtitle={blog.description}
    >
      <HTMLMetadata title={blog.name} description={blog.description} />
      <div className="post-list">
        {posts.map(post => {
          return (
            <div className="post columns" key={post.slug}>
              {post.image && (
                <div className="column is-one-third">
                  <Link to={`/post/${post.slug}/`}>
                    <ImgNonStreched
                      fluid={post.image.url}
                      alt={edge.node.image.alt}
                    />
                  </Link>
                </div>
              )}
              <div className="column">
                <h2 className="title is-3">
                  <Link to={`/post/${post.slug}/`}>{post.title}</Link>
                </h2>
                <div className="date">
                  <small>
                    <span className="date-clock">
                      <ClockIcon />
                    </span>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </small>
                </div>
                <div className="post-teaser content">
                  <p>{post.teaser}</p>
                </div>
                <Link
                  className="read-more button is-light"
                  to={`/post/${post.slug}/`}
                >
                  {readMoreText}
                </Link>
              </div>
            </div>
          );
        })}
        <Pagination
          location={location}
          totalResults={pageContext.paginationTotalCount}
          resultsPerPage={postsPerPage}
        />
      </div>
    </Layout>
  );
}

export default PostListTemplate;

export const pageQuery = graphql`
  query PostListQuery($postsPerPage: Int!, $page: Int!) {
    site {
      siteMetadata {
        postsPerPage
        displayAuthor
        readMoreText
      }
    }
    fireblog {
      blog {
        name
        description
        image {
          url
          alt
        }
      }
      posts(itemsPerPage: $postsPerPage, page: $page) {
        pagination {
          totalItems
          totalPages
          hasNextPage
          hasPreviousPage
        }
        items {
          teaser
          slug
          title
          content
          publishedAt
          updatedAt
          image(auto: [compress, format]) {
            url
            alt
          }
          imagePostList: image(
            w: 400
            h: 220
            fit: crop
            crop: center
            auto: [compress, format]
          ) {
            url
            alt
          }
        }
      }
    }
  }
`;
