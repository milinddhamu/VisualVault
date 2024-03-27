import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
  query SlingacademyQuery($limit: String, $offset: String) {
    slingacademyQuery(limit: $limit, offset: $offset) {
      limit
      message
      offset
      photos {
        description
        id
        title
        url
        user
      }
      success
      total_photos
    }
  }
`