export function getErrorMessage(error: any) {
  if (error.errors) {
    for (const graphQLError of error.errors) {
      if (graphQLError.extensions) {
        const { code } = graphQLError.extensions;
        if (!code) {
          return "Something went wrong!";
        }
        if (code === "BAD_USER_INPUT") {
          return "User Input Error";
        }
        if (code === "UNAUTHENTICATED") {
          return "Authentication Error";
        }
      }
    }
  }
  return "Something went wrong!";
}
