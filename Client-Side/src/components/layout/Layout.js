import MainNav from "./MainNav";
function layout(props) {
  return (
    <div>
      <MainNav />
      <main>
        {
          props.children //routing tags inside
        }
      </main>
    </div>
  );
}
export default layout;
