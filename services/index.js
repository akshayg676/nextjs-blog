import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query Authors {
      postsConnection {
        edges {
          node {
            createdAt
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            slug
            title
            featuredImage {
              url
            }
            excerpt
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const response = await request(graphqlAPI, query);
  return response.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
 query getPostDetails(){
  posts(
    orderBy: createdAt_ASC
    last:3
  ){
    title
    featuredImage{
      url
    }
    createdAt
    slug
  }
 }
 `;
  const response = await request(graphqlAPI, query);
  return response.posts;
};
