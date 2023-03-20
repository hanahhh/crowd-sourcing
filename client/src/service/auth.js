export function getAllowedRoute(routes, role) {
  var allowedData = [];
  routes.forEach((route) => {
    if (route.permission) {
      if (route.permission.includes(role)) {
        allowedData.push(route);
      }
    } else {
      allowedData.push(route);
    }
  });

  return allowedData;
}

export function getAllowedNav(navigation, role) {
  var allowedData = [];
  navigation.forEach((nav) => {
    if (nav.permission) {
      if (nav.permission.includes(role)) {
        if (nav._children) {
          nav._children.forEach((child, index) => {
            if (child.permission && !child.permission.includes(role)) {
              nav._children.splice(index, 1);
            }
          });
        }
        allowedData.push(nav);
      }
    } else {
      if (nav._children) {
        nav._children.forEach((child, index) => {
          if (child.permission && !child.permission.includes(role)) {
            nav._children.splice(index, 1);
          }
        });
      }

      allowedData.push(nav);
    }
  });

  return allowedData;
}

export function isLoggedIn() {
  return !!localStorage.getItem(`user`);
}

export function logOut() {
  localStorage.removeItem(`${import.meta.env.VITE_APP_PREFIX_LOCAL}_user`);
  localStorage.removeItem(
    `${import.meta.env.VITE_APP_PREFIX_LOCAL}_access_token`
  );
  window.location.href = "/login";
}

export const storeUserData = (data) => {
  localStorage.setItem(
    `${import.meta.env.VITE_APP_PREFIX_LOCAL}_user`,
    JSON.stringify(data)
  );
};
