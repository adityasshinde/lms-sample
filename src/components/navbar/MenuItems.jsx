import { Bookmarks, Books, Compass, Exam, Video } from '@phosphor-icons/react';
import {
  IconApps,
  IconAddressBook,
  IconSmartHome,
  IconBrandYoutube,
  IconInfoCircle,
  IconCalendarEvent,
  IconNotebook,
  IconLayoutDashboard
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const StudentMenuItems = [

  // {
  //   id: uniqueId(),
  //   title: 'Home',
  //   icon: IconSmartHome,
  //   href: '/lms'
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Dashboard',
  //   icon: IconLayoutDashboard,
  //   href: '/lms/dashboard'
  // },
  {
    id: uniqueId(),
    title: 'Explore',
    icon: Compass,
    href: '/lms/explore'
  },
  {
    id: uniqueId(),
    title: 'My Courses',
    icon: Video,
    href: '/lms/my_courses'
  },
  {
    id: uniqueId(),
    title: 'My Test Series',
    icon: Exam,
    href: '/lms/my_test_series'
  },
  // {
  //   id: uniqueId(),
  //   title: 'My TimeTable',
  //   icon: IconCalendarEvent,
  //   href: '/lms/timetable'
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Library',
  //   icon: Books,
  //   href: '/lms/library'
  // },
  {
    id: uniqueId(),
    title: 'WishList',
    icon: Bookmarks,
    href: '/lms/wishlist'
  },
  // {
  //   id: uniqueId(),
  //   title: 'Home',
  //   icon: IconSmartHome,
  //   href: '/'
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Courses',
  //   icon: IconBrandYoutube,
  //   href: '/courses'
  // },
  // {
  //   id: uniqueId(),
  //   title: 'My Learning',
  //   icon: IconNotebook,
  //   href: '/student/my_learning'
  // },
  // {
  //   id: uniqueId(),
  //   title: 'My Timetable',
  //   icon: IconCalendarEvent,
  //   href: '/student/my_timetable'
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Study Material',
  //   icon: IconApps,
  //   href: '/study'
  // },
  // {
  //   id: uniqueId(),
  //   title: 'About us',
  //   icon: IconInfoCircle,
  //   href: '/about-us'
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Contact us',
  //   icon: IconAddressBook,
  //   href: '/contact'
  // },

];

export { StudentMenuItems };
