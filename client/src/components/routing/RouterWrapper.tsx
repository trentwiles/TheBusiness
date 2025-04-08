import { useEffect } from "react";

type setX = (title: string) => void;

type props = {
  element: React.ComponentType;
  title?: string;
  subclass?: string;
  subclassLink?: string;
  setPageTitle: setX;
  setSubclass: setX;
  setSubclassLink: setX;
};

const RouteWrapper = (props: props) => {
  useEffect(() => {
    props.setPageTitle(props.title || "");
    props.setSubclass(props.subclass || "");
    props.setSubclassLink(props.subclassLink || "")
  }, [props]);

  return <props.element />;
};

export default RouteWrapper;