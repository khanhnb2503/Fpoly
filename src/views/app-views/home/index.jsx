import Banner from "../../../components/shared/Banner";
import Courses from "../../../components/shared/Courses";

function HomePage() {
  return (
    <div className='wrapper__homepage'>
      <Banner />
      <div className="containers">
        <Courses />
      </div>
    </div>
  );
}

export default HomePage;