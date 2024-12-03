import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    NProgress.start(); // เริ่มแถบโหลดเมื่อเริ่มเปลี่ยนเส้นทาง
  });

  nuxtApp.hook('page:finish', () => {
    NProgress.done(); // จบแถบโหลดเมื่อเสร็จสิ้นการโหลดหน้า
  });

  NProgress.configure({
    showSpinner: false, // ซ่อนไอคอน Spinner
    speed: 500, // ความเร็วของแถบโหลด (ms)
    minimum: 0.1 // จุดเริ่มต้นของแถบโหลด
  });
  
});
