import { AxiosConfig } from "../configs/axiosConfig";
export const hitAccept = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/hits/accept`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const getAllHit = (pagination, filters, sort, callback) => {
  const axios = AxiosConfig();
  let api = "";
  if (Object.keys(filters).length !== 0) api = `/hits?${filters}`;
  else api = `/hits`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const getHITByWorker = (callback) => {
  const axios = AxiosConfig();
  const api = "/hits/by-worker?sort=updatedAt%3Adesc";

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const hitReject = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/hits/reject`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
export const getHitByID = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/hits/${id}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const applyHIT = (id, callback) => {
  const axios = AxiosConfig();
  const api = `/hits/${id}/apply`;
  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
export const getUserMe = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/users/me`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const submitHIT = (id, data, callback) => {
  const axios = AxiosConfig();
  const api = `/hits/${id}/submit`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
export const updateUser = (id, data, callback) => {
  const axios = AxiosConfig();
  let api = `/users/${id}`;
  data = data.dataSubmit;
  axios
    .put(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const getStatic = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/statistic-by-worker`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
