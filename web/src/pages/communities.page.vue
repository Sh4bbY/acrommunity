<template>
  <v-container>
    <h2 class="d-flex justify-space-between mt-5">
      <span>{{ $tc('p.community', 2) }}</span>
      <a href="https://t.me/acroverteiler" target="_blank" class="d-inline-flex align-center">
        <v-img src="/img/brand/telegram.svg" width="30" class="mr-2 mb-2"/>
        <span>{{ $t('label.acrodispencer') }}</span>
      </a>
    </h2>

    <v-card class="mb-5">
      <v-tabs v-model="tab" grow show-arrows>
        <v-tab v-for="community in communities" :key="community.area">{{ community.area }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="pa-3">
        <v-tab-item v-for="(community, idx) in communities" :key="idx">
          <v-row>
            <v-col v-for="(item, idx) in community.items" :key="idx" cols="12" sm="6" md="4" lg="3">
              <v-card flat outlined>
                <v-card-title class="pb-0">{{ item.name }}</v-card-title>
                <v-card-subtitle class="pt-4 pb-0" v-if="item.note">{{ item.note }}</v-card-subtitle>
                <v-card-actions class="px-3">
                  <a v-if="item.slack" :href="item.slack" target="_blank" class="mr-2">
                    <v-img src="/img/brand/slack.svg" width="30"/>
                  </a>
                  <a v-if="item.whatsapp" :href="item.whatsapp" target="_blank" class="mr-2">
                    <v-img src="/img/brand/whatsapp.svg" width="30"/>
                  </a>
                  <a v-if="item.telegram" :href="item.telegram" target="_blank" class="mr-2">
                    <v-img src="/img/brand/telegram.svg" width="30"/>
                  </a>
                  <a v-if="item.signal" :href="item.signal" target="_blank" class="mr-2">
                    <v-img src="/img/brand/signal.svg" width="30"/>
                  </a>
                  <a v-if="item.instagram" :href="item.instagram" target="_blank" class="mr-2">
                    <v-img src="/img/brand/instagram.svg" width="30"/>
                  </a>
                  <v-btn v-if="item.website" icon :href="item.website" target="_blank" class="mr-2">
                    <v-icon>mdi-web</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <h2 class="d-flex justify-space-between mt-5">
      <span>Worldmap</span>
      <a href="https://www.acropedia.org/communities/" target="_blank">acropedia.org/communities</a>
    </h2>
    <iframe loading="lazy" src="https://www.google.com/maps/d/embed?mid=13LctEOyRERcHv8UUC4o1kVCZbPehgPbp&amp;z=2" width="100%" height="700px" style="border:none"/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from './page.vue';

@Component({
  components: {},
})
export default class CommunitiesPage extends Page {
  tab = 0;
  spain = [];
  communities = [
    {
      area: 'Germany',
      items: [
        {name: 'Halle (Saale)', telegram: 'https://t.me/joinchat/WzI1_pfLxAcJy_y1'},
        {name: 'Leipzig', telegram: 'https://t.me/+MEV3hYHl8mQ3Y2I6'},
        {name: 'Frankfurt', telegram: 'https://t.me/joinchat/G5v_3VhF6MZiEzPpLp7dsQ'},
        {name: 'Erlangen',  telegram: 'https://t.me/palmcron', note: '@palmcron (Just send a message with "Acro-Erlangen" and you will be added)'},
        {
          name: 'Dresden',
          signal: 'https://signal.group/#CjQKIPVJD32ADdEc7uDR-I5VPxVO2KfaMqlm7jVqqEVPFsYJEhAcTVHAwdn7-9VFGQzolZ5b',
          note: 'Please write a short message who you are and where you got the link from',
        },
        {name: 'Chemnitz', whatsapp: 'https://chat.whatsapp.com/LvTrDwmYgpS8Tv5SfSZvmq'},
        {name: 'Würzburg', whatsapp: 'https://chat.whatsapp.com/E0zYmlhbdS2E55cxQm7K64'},
        {name: 'Stralsund', whatsapp: 'https://chat.whatsapp.com/KpKhmnSKAb2A46BKZX4gdC'},
        {name: 'Rostock', signal: 'https://signal.group/#CjQKIBiiLyEUugeyhEj6Kj2k4qgm9zwC0y-hthoWuWOQKoY0EhAZwT-Gt0SvZFXTDtfpJEQI', telegram: 'https://t.me/AcroYogaTheater'},
        {name: 'Mitteldeutschland', note: '(Sachen, Thüringen, Sachsen-Anhalt)', whatsapp: 'https://chat.whatsapp.com/Iq9yVdGrXFxLMNqtFLzybt'},
        {name: 'Darmstadt', whatsapp: 'https://chat.whatsapp.com/FcLjjeBlzhBHtDaNrNJ49B'},
        {name: 'Berlin', telegram: 'https://t.me/joinchat/WLOuDiEQkYZiNDMy'},
        {name: 'Köln', telegram: 'https://t.me/joinchat/I-pCrByiYS1y1EpUz40nsQ'},
        {name: 'Munich', slack: 'https://join.slack.com/t/acroyoga-workspace/shared_invite/zt-19vtxwjpf-bmkVhsqwKJwVoA_XvFpXXw'},
        {name: 'Darmstadt', telegram: 'https://t.me/joinchat/0OH7JuLkxbphYWIy'},
        {name: 'Bremen', telegram: 'https://t.me/joinchat/CPo-cwgVUb9Col3Ta755Bg'},
        {name: 'Braunschweig', signal: 'https://signal.group/#CjQKIH5NkE5uY3XaDPbL-sT6AqTpqL5HH-xMNoGM1D6gaH7hEhDWu-yyXs9iGcQDIpeWDdNH'},
        {name: 'Mannheim', whatsapp: 'https://chat.whatsapp.com/GaZNsFbJyzUDUfP02mQk1f'},
        {name: 'Heidelberg', whatsapp: 'https://chat.whatsapp.com/3QGlk4yVaL06N5rEa1kIZK'},
        {name: 'Konstanz',  telegram: 'https://t.me/LeonLais', note: '@LeonLais (Just send a message with "Acro-Konstanz" and you will be added)'},
        {name: 'Göttingen',  telegram: 'https://t.me/Xzander3', note: '@Xzander3 (Please write a short message who you are and why you want to join)'},
        {name: 'Kassel', telegram: 'https://t.me/+TCnouz93O7wq2vx_'},
        {name: 'Oldenburg', telegram: 'https://t.me/+Wme2EWOxzuE3ZmYy'},
        {name: 'Hamburg', whatsapp: 'https://chat.whatsapp.com/6qHjzxzqndfFEvFBT1rWjK', telegram: 'https://t.me/joinchat/K_VS70g80G2ewh3iVg6grQ'},
        {
          name: 'Karlsruhe',
          whatsapp: 'https://chat.whatsapp.com/Cu0ZGOapTwq4kn6CRB7VRg',
          signal: 'https://signal.group/#CjQKIG5T3v30VRotRhlKs_GAgA91SZ3h9aHZVazStJ_1urkJEhDTT0pdAWj4V3s5hSbvoXIr',
        },
        {name: 'Bielefeld', whatsapp: 'https://chat.whatsapp.com/4BjT90Sh1xu9qLao9uc6l7'},
        {name: 'Erfurt', telegram: 'https://t.me/+hhtPW0ZUz7s5MDQ6'},
        {name: 'Bayreuth', signal: 'https://signal.group/#CjQKINJS-rxZeQWZ9lzjvUBl1HBIEx3okKOSJ1QotAck9jPQEhAgWXYrJHZ3qEEPQssiEucN'},
        {name: 'Lüneburg', telegram: 'https://t.me/+nYfl0PJMEtBhMjli', signal: 'https://signal.group/#CjQKIMeH4FpEa9XGZE_ZWLzkqRZJm3NQGwFxh_OUFxDG7ZlrEhBHOET-95ZOpWlovNBC6i1k'},
        {name: 'Stuttgart', whatsapp: 'https://chat.whatsapp.com/LWh5rLniGaLKGkfM8ufkki'},
        {name: 'Trier', telegram: 'https://t.me/joinchat/NmfbPBo1G1iiv1yXU9jayQ'},
        {name: 'Greifswald', telegram: 'https://t.me/+5aZ-XWg2ZedhYmYy'},
        {name: 'Bamberg', whatsapp: 'https://chat.whatsapp.com/GnKcp3hbXxGKhq2sD5WSts'},
        {name: 'Münster', telegram: 'https://t.me/+ZUCpVIMyvKc3NTAy'},
        {name: 'Hamburg', telegram: 'https://t.me/AcroYogaHamburg'},
      ],
    },
    {
      area: 'Austria',
      items: [
        {name: 'Vienna', whatsapp: 'https://chat.whatsapp.com/AmFn4uOWiteFNIBJeb3jVv'},
        {name: 'Graz', whatsapp: 'https://chat.whatsapp.com/F83idqRNVOO66FHEcPExfH '},
        {name: 'Linz', signal: 'https://signal.group/#CjQKIDFieTaSAb3A_TMd1rOpnHI1Uld6CESf83jYs6eGD4VDEhCl98DPWG0Rj1WgsQRYxNFf'},
        {name: 'Salzburg', whatsapp: 'https://chat.whatsapp.com/Hg1e5CdtrfK4H7XgrQkyNG'},
        {
          name: 'Tirol/Innsbruck',
          website: 'https://acroversum.bss.at/',
          note: 'Contact on Instagram (to be added to the Whatsapp group)',
          instagram: 'https://instagram.com/acroversum?igshid=YmMyMTA2M2Y=',
        },
        {name: 'Klagenfurt', whatsapp: 'https://chat.whatsapp.com/GA7NRLfNo4D7WALr9sone0'},
        {name: 'Carinthia', facebook: 'https://www.facebook.com/AcroYoga-Carinthia-Verein-102524012195694', instagram: 'https://www.instagram.com/acroyoga_carinthia/'},
      ],
    },
    {
      area: 'Switzerland',
      items: [
        {name: 'Zurich', telegram: 'https://t.me/+SdcJw67UTKBc12x-'},
      ],
    },
    {
      area: 'Spain',
      items: [
        {name: 'La Palma', whatsapp: 'https://chat.whatsapp.com/HJj3bFs0ZeSE6fBF8hAkJe'},
        {name: 'Teneriffa', telegram: 'https://t.me/AcroTenerife'},
        {name: 'North', whatsapp: 'https://chat.whatsapp.com/LDgFi7sUf9rBf6GhXFSDJG'},
        {name: 'Valencia', whatsapp: 'https://chat.whatsapp.com/JBOe8VOfetj7noV89DNjmN'},
        {name: 'Ibiza', whatsapp: 'https://chat.whatsapp.com/9Wo2VLomcbD5DGRkyh07Zi'},
        {name: 'Barcelona', telegram: 'https://t.me/joinchat/TXx9RnhR_DI0OTE0'},
      ],
    },
  ];
}
</script>
