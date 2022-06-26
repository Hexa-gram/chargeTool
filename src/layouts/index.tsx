import React from 'react';
import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.navs}>
        {/* <ul>
          <li>
            <Link to="/">工单生成器</Link>
          </li>
          <li>
            <Link to="/summary">汇总</Link>
          </li>
          <li>
            <a href="https://github.com/umijs/umi">Github</a>
          </li>
        </ul> */}
        <Outlet />
      </div>
    </div>

  );
}
