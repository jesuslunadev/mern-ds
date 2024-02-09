import imageIcon from '../../assets/image_icon.png';
import youtubeIcon from '../../assets/youtube_icon.png';
import docIcon from '../../assets/doc_icon.png';


const categoryIcons = {
  images: imageIcon,
  videos: youtubeIcon,
  documents: docIcon,
};

/**
 * Badge Component
 * @param {Object} props - The component props
 * @param {string} props.children - The category name for the badge
 * @returns {JSX.Element} - The rendered badge
 */
const Badge = ({ children }) => {

  const icon = categoryIcons[children];

  return (
      <span
          className="capitalize flex py-1 px-2 mr-2 mb-2 border-2 border-gray-200 rounded-full text-sm font-medium tracking-wide text-gray-700 bg-transparent self-start">
        <img
            src={icon}
            alt="badge icon"
            className="w-6 h-6 mr-2"
        />
        {children}
      </span>
  );
};

export default Badge;