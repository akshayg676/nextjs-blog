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

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `;

  const response = await request(graphqlAPI, query, { slug });
  return response.post;
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

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.categories;
};
