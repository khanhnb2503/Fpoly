import { Button, Result } from 'antd';
import {Link} from "react-router-dom";
export function NotFound() {
    return (
        <div>
            <Result
              status="404"
              title="PAGE NOT FOUND"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Link to="/">
                    <Button type="primary">Back Home</Button>
                </Link>
              }
            />
        </div>
    )
}
