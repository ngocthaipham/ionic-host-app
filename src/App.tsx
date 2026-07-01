import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { HomeApp } from '@your-org/mfe-home';
import { ProductsApp } from '@your-org/mfe-products';
import { cart, home } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import { mfeConfig } from './config/mfe-config';

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <HomeApp {...mfeConfig.home} />
            </Route>
            <Route exact path="/products">
              <ProductsApp {...mfeConfig.products} />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>Trang chủ</IonLabel>
            </IonTabButton>
            <IonTabButton tab="products" href="/products">
              <IonIcon icon={cart} />
              <IonLabel>Sản phẩm</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}
