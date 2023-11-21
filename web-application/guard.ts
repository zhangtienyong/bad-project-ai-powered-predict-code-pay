import { Request, Response, NextFunction } from "express";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next();
    return;
  }
  res.redirect("/");
};

export const isLoggedInApi = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next();
    return;
  }

  res.status(401).json({ message: "Unauthorized" });
};

export const isEmployerLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user?.role === "employer") {
    next();
    return;
  }
  res.redirect("/");
};

export const isEmployerLoggedInApi = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user?.role === "employer") {
    next();
    return;
  }

  res.status(401).json({ message: "Unauthorized" });
};

export const isDeveloperLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user?.role === "developer") {
    next();
    return;
  }
  res.redirect("/");
};

export const isDeveloperLoggedInApi = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user?.role === "developer") {
    next();
    return;
  }

  res.status(401).json({ message: "Unauthorized" });
};

export const createIsLoggedInApiV2 =
  (roles: ("employer" | "developer")[]) => (req: Request, res: Response, next: NextFunction) => {
    for (const role of roles) {
      if (req.session.user?.role === role) {
        next();
        return;
      }
    }

    res.status(401).json({ message: "Unauthorized" });
  };

// const isLoggedInApiV2 = createIsLoggedInApiV2(["employer"]);
// const isLoggedInApiV2 = createIsLoggedInApiV2(["developer"]);
// const isLoggedInApiV2 = createIsLoggedInApiV2(["developer", "employer"]);
