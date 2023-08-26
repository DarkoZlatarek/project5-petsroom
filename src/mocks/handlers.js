import { rest } from "msw";

const baseURL = "https://petsroom-drf-api-11e537707187.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 2,
        username: "Darko",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 2,
        profile_image:
          "https://res.cloudinary.com/dcqcddsyx/image/upload/v1/media/../default-avatar-image_smynjx",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
