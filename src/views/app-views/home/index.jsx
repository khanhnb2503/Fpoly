
import Banner from "../../../components/shared/Banner";
import Courses from "../../../components/shared/Courses";
import Videos from "../../../components/shared/Videos";
import Blogs from "../../../components/shared/Blogs";
function HomePage() {
  return (
    <div className='wrapper__homepage'>
      {/* <Banner /> */}
      <div className="containers">
        <Courses />
        <div className="video-title">
          <h5>Video nổi bật</h5>
          <Videos />
        </div>
        <div className="blogs-title">
          <h5>Bài viết mới nhất </h5>
          <Blogs/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;