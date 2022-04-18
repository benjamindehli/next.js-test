// Components
import Container from "components/template/Container";
import List from "components/template/List";
import ListItem from "components/template/List/ListItem";
import EquipmentItem from "./EquipmentItem";

const EquipmentList = (props) => {
    const renderEquipment = () => {
        return props.equipment?.length
            ? props.equipment.map((equipmentItem) => {
                  return (
                      <ListItem key={equipmentItem.slug}>
                          <EquipmentItem equipmentItem={equipmentItem} equipmentTypeSlug={props.equipmentTypeSlug} />
                      </ListItem>
                  );
              })
            : "";
    };

    return (
        <Container blur={props.blur}>
            <List>{renderEquipment()}</List>
        </Container>
    );
};

export default EquipmentList;
