
import Banner from "../../../components/shared/Banner";
import Courses from "../../../components/shared/Courses";
import Videos from "../../../components/shared/Videos";

function HomePage() {
  return (
    <div className='wrapper__homepage'>
      <Banner />
      <div className="containers">
        <Courses />
        <div className="video-title">
          <h5>Video nổi bật</h5>
          <Videos />
        </div>
      </div>
    </div>
  );
}

export default HomePage;