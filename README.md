# Images Gallery Project

This project is a React-based photo library application designed to allow users to browse and manage their photo collections effectively. It comprises two main pages: the home page (`"/"`) and the favorites page (`"/favorites"`), each offering distinct features tailored to enhance the user experience.

## Features

### Home Page (`"/"`)

- **Custom Grid Layout**: The home page features a visually appealing custom grid layout showcasing a set of images retrieved from the API.
- **Infinite Scroll**: Implemented infinite scrolling ensures seamless browsing by dynamically loading additional images as the user scrolls down the page.
- **Image Components**:
  - **Add to Favorites**: Users can mark images as favorites directly from the home page, enhancing user engagement and personalization.
  - **Full Size View**: Each image component provides an option to view the image in full size, offering users a detailed look at their favorite photos.
  - **Photographer Links**: Links to the photographers' profiles are provided for users to explore more work by their favorite photographers.
- **Search Functionality**: A search bar enables users to search for specific images by entering keywords. Search results are displayed dynamically, providing a tailored browsing experience.

### Favorites Page (`"/favorites"`)

- **Favorites Management**: Users can view and manage their favorite images on this dedicated page.
- **Sorting**: A sorting button allows users to organize their favorite images based on specific criteria, enhancing usability.
- **Edit Image Details**: Each image on the favorites page features an edit button, enabling users to update image details such as title and description through a modal component.
- **Validation**: The modal component for editing image details incorporates proper validation to ensure data integrity and user input accuracy.

### State Management

- **Redux Integration**: Redux is utilized for efficient state management across components, ensuring a seamless and consistent user experience.
- **UseCallback for Fetch**: Fetch requests are optimized using the useCallback hook to prevent interference between successive requests, ensuring smooth infinite pagination.

## Getting Started

Follow these steps to set up and run the project:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run dev`.
4. Access the application in your browser.

## Technologies Used

- React
- Redux
- Axios
- Tailwind CSS (or mention the UI library chosen)
- ESLint for linting
- Vite for development server and build tool

## License

This project is licensed under the [License Name] License - see the [LICENSE.md](LICENSE.md) file for details.
