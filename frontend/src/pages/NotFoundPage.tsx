import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="hata-kutusu">
      <h2>Sayfa bulunamadı</h2>
      <p>Aradığınız adres mevcut değil ya da taşınmış olabilir.</p>
      <Link className="buton" to="/">
        Ana sayfaya dön
      </Link>
    </div>
  );
}

export default NotFoundPage;
