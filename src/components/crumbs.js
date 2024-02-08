import { Breadcrumbs, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Crumbs() {
  const location = useLocation();
  const path = location.pathname;
  const breadcrumbs = path.slice(1).split("/");
  return (
    <Breadcrumbs
      separator={
        <ChevronRight
          style={{
            height: "12px",
            width: "12px",
            marginRight: "-5px",
            marginLeft: "-5px",
          }}
        />
      }
      sx={{ color: "text.primary" }}
    >
      {breadcrumbs.map((item, index) =>
        index > 0 ? (
          <Link key={index}>
            <Typography
              fontSize={12}
              color={breadcrumbs.length === index + 1 ? "primary.main" : ""}
            >
              {item.slice(0, 1).toUpperCase() + item.slice(1).replace("_", " ")}
            </Typography>
          </Link>
        ) : (
          <Typography key={index} fontSize={12}>
            {item.slice(0, 1).toUpperCase() + item.slice(1).replace("_", " ")}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
}
