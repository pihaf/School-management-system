import AdminRoutes from "./AdminRoutes";

function PageContent({ isAuthenticated }) {
  return (
    <div className="PageContent">
      <AdminRoutes isAuthenticated={isAuthenticated}/>
    </div>
  );
}
export default PageContent;
