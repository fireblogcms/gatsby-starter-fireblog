import React from "react";
import { graphql } from "gatsby";
import PostDetail from "../components/PostDetail";
import { recentPosts } from "../utils/graphQLFragments";

function PostTemplate({ data, location }) {
  const { blog, post, recentPosts } = data.fireblog;
  return (
    <div>
      <PostDetail
        blog={blog}
        post={post}
        title={post.title}
        description={post.teaser}
        location={location}
        recentPosts={recentPosts.items}
      />
    </div>
  );
}

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlugPageQuery($slug: String!, $blog: ID!) {
    fireblog {
      blog(filter: { _id: { eq: $blog } }) {
        name
        description
        image {
          alt
          url
        }
      }
      recentPosts: posts(
        itemsPerPage: 5
        page: 1
        filter: { blog: { eq: $blog } }
        sort: { publishedAt: desc }
      ) {
        ...recentPosts
      }
      post(filter: { slug: { eq: $slug }, blog: { eq: $blog } }) {
        title
        publishedAt
        teaser
        content
        image {
          url
          alt
        }
        publishedAt
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
`;
