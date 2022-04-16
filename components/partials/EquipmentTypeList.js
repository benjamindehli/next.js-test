// Components
import Container from "components/template/Container";
import List from "components/template/List";
import ListItem from "components/template/List/ListItem";
import EquipmentTypeItem from "./EquipmentTypeItem";

const EquipmentTypeList = (props) => {
    const renderEquipmentTypes = () => {
        return props.equipmentTypes?.length
            ? props.equipmentTypes.map((equipmentType) => {
                  return (
                      <ListItem key={equipmentType.slug}>
                          <EquipmentTypeItem equipmentType={equipmentType} />
                      </ListItem>
                  );
              })
            : "";
    };

    return (
        <Container blur={props.blur}>
            <List>{renderEquipmentTypes()}</List>
        </Container>
    );
};

export default EquipmentTypeList;
