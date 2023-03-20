import { AxiosConfig } from "../configs/axiosConfig";

export const getAllBatch = (pagination, filters, sort, callback) => {
  const axios = AxiosConfig();
  let api = `/batches-by-requester?filters[status][$eq]=unpublished`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const getBatchByID = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/batches/${id}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const getAllPublishedBatch = (pagination, filters, sort, callback) => {
  const axios = AxiosConfig();
  let api = `/batches-by-requester?filters[status][$ne]=unpublished&sort=createdAt%3Adesc`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const publishBatch = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/batches/publish`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const createBatch = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/batches`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const uploadImageBatch = (files, callback) => {
  const axios = AxiosConfig();
  let api = `/upload`;

  axios
    .post(api, files)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const updateBatchByID = (id, data, callback) => {
  const axios = AxiosConfig();
  let api = `/batches/${id}`;

  axios
    .put(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const deleteBatchByID = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/batches/${id}`;

  axios
    .delete(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const closeBatch = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/batches/${id}/close`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
