import { Col, Pagination, Row, Typography } from "antd";
import { useState } from "react";

import { useGetBlogsQuery } from "../../../services/blogs";
import { CardsBlog } from "../CardBlogs/index.jsx";
import SkeletonPage from "../SkeletonPage/index.jsx";

function BlogsPage() {
  const { Title } = Typography;
  const [pageNumber, setPageNumber] = useState(1);

  const { data: blogs, isLoading } = useGetBlogsQuery(pageNumber);

  return (
    <div className="wrapper__blog--page">
      <div>
        <Title level={1}>Bài Viết</Title>
        <Title level={3}>
          Nơi chia sẻ, học hỏi và trau dồi kiến thức về mảng lập trình. Giúp mọi người có nhiều kiến thức
          và nền tảng vững chắc.
        </Title>
        <SkeletonPage isLoading={isLoading} active>
          {!isLoading && blogs.data.data.map((blog, index) => {
            return (
              <Row key={index} gutter={[10, 48]} style={{ marginBottom: 20 }}>
                <Col span={23}>
                  <CardsBlog data={blog} />
                </Col>
              </Row>
            )
          })}
        </SkeletonPage>
        <div className="pagination-blog">
          {!isLoading && (
            <Pagination
              pageSize={8}
              defaultCurrent={1}
              total={10}
              onChange={(page) => setPageNumber(page)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogsPage;
