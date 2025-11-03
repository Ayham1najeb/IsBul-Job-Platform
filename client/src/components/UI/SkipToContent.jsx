/**
 * Skip to Content Link
 * Erişilebilirlik için - klavye kullanıcıları ana içeriğe atlayabilir
 */
import { Link } from 'react-router-dom';

const SkipToContent = ({ targetId = 'main-content' }) => {
  return (
    <Link
      to={`#${targetId}`}
      className="skip-to-content"
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.focus();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      Ana İçeriğe Atla
    </Link>
  );
};

export default SkipToContent;

