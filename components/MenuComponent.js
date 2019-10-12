import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

class Menu extends Component {
  static navigationOptions = {
    title: "Menu"
  };

  renderMenuItem = ({ item }) => {
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <Tile
          key={item.id}
          title={item.name}
          subtitle={item.description}
          featured
          onPress={() =>
            this.props.navigation.navigate("DishDetail", { dish: item })
          }
          imageSrc={{ uri: baseUrl + item.image }}
        />
      </Animatable.View>
    );
  };

  render() {
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={this.renderMenuItem}
          keyExtractor={item => item.id.toString()}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  dishes: state.dishes
});

export default connect(mapStateToProps)(Menu);
