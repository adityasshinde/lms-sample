
  
  const menu_data= [
    {
      id: 1,
      hasDropdown: true,
      active: true,
      title: "Home",
      pluseIncon: true,
      link: "/",
      submenus: [
        { title: "Home 1", link: "/" },
        { title: "Home 2", link: "/homeTwo" },
        { title: "Home 3", link: "/homeThree" },
      ],
    },
    {
      id: 2,
      hasDropdown: true,
      title: "Course",
      link: "/course",
      pluseIncon: true,
      submenus: [
        { title: "Course 1", link: "/course" },
        { title: "Course 2", link: "/course-2" },
        { title: "Course 3", link: "/course-3" },
        { title: "Course 4", link: "/course-4" },
        { title: "Course details", link: "/course-details" },
        { title: "Webinars", link: "/webinars" },
        { title: "Webinar Details", link: "/webinar-details" },
      ],
    },
  
    {
      id: 3,
      hasDropdown: true,
      title: "Shop",
      link: "/shop",
      pluseIncon: true,
      submenus: [
        { title: "Shop", link: "/shop" },
        { title: "Shop Details", link: "/shop-details" },
        { title: "wishlist", link: "/wishlist" },
        { title: "cart", link: "/cart" },
        { title: "checkout", link: "/checkout" },
      ],
    },
  
    {
      id: 4,
      title: "Pages",
      megaMenu: true,
      link: "",
      pluseIncon: true,
      pages: true,
      mega_menus: [
        {
          title: "About",
          link: "/about",
        },
        {
          title: "Instructor",
          link: "/instructor",
          hasDropdown: true,
          submenus: [
            { title: "Instructor", link: "/instructor" },
            { title: "Instructor profile", link: "/instructor-profile" },
            { title: "Student-profile", link: "/student-profile" },
            { title: "Become instructor", link: "/become-instructor" },
          ],
        },
  
        {
          title: "zoom class",
          link: "/zoom-class",
          hasDropdown: true,
          submenus: [
            { title: "Zoom class", link: "/zoom-class" },
            { title: "Zoom class details", link: "/zoom-class-details" },
          ],
        },
  
        {
          title: "Blog",
          link: "/blog",
          hasDropdown: true,
          submenus: [
            { title: "Blog", link: "/blog" },
            { title: "blog details", link: "/blog-details" },
          ],
        },
  
        {
          title: "Event",
          link: "/event",
          hasDropdown: true,
          submenus: [
            { title: "Event", link: "/event" },
            { title: "Event Details", link: "/event-details" },
          ],
        },
  
        {
          title:"membership plan",
          link: "/membership",
        },
         {
          title: "FAQ page",
          link: "/faq-page",
          hasDropdown: true,
          submenus: [
            { title: "FAQ page", link: "/faq-page" },
            { title: "FAQ details", link: "/faq-details" },
          ],
        },
           {
          title:"Sign In",
          link: "/login",
        },
           {
          title:"Sign Up",
          link: "/registration",
        },
        { title: "Terms & Conditions", link: "/terms-conditions" },
        { title: "Privacy & Policy", link: "/policy-privacy" },
           {
          title:"404-page",
          link: "/404-page",
        },
           {
          title:"Contact",
          link: "/contact",
        },
  
  
      ],
    },
  
  ];
  
  export default menu_data;
  