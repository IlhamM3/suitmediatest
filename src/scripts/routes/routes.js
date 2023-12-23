import about from '../../view/page/about';
import career from '../../view/page/careers';
import ideas from '../../view/page/ideas';
import service from '../../view/page/service';
import work from '../../view/page/work';
import contact from '../../view/page/contact';

const routes = {
    '/':ideas,
    '/ideas':ideas,
    '/careers':career,
    '/work': work,
    '/service': service,
    '/contact':contact,
    '/about':about,

};

export default routes;